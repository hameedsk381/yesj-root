import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { Card, Image, Text, Group, Badge, Button } from "@mantine/core";
import { CourseDetailsModal } from "./animated-model";
import classes from "./BadgeCard.module.css";

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

export function BadgeCard({ image, title, description, badges, duration, courselink }) {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const features = badges.map((badge) => (
    <Badge variant="light" key={badge.label} leftSection={badge.emoji}>
      {badge.label}
    </Badge>
  ));

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className="relative"
    >
      <Card withBorder radius="md" p="xl" className={classes.card} style={{ height: "400px",  }}>
        <Card.Section style={{ height: "180px" }}>
          <Image src={image} alt={title} height={180} className="object-cover" />
        </Card.Section>

        <Card.Section className={classes.section} mt="md" style={{ height: "100px" }}>
          <Text fz="lg" fw={500}>
            {title}
          </Text>
          <Text fz="xs" my="xs" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',height:'100px' }}>
            {description}
          </Text>
        </Card.Section>

        <Group mt="xs">
          <Button>
            <CourseDetailsModal
              title={title}
              description={description}
              duration={duration}
              courselink={courselink}
            />
          </Button>
        </Group>
      </Card>
    </motion.div>
  );
}
